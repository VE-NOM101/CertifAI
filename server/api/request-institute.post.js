import institute from "~/model/institute";
import { connectToDatabase } from "~/utils/mongoose";
import { join } from "path";
import { nanoid } from "nanoid";
import { writeFile } from "fs/promises";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  await connectToDatabase(config.MONGODB_URI, config.MONGODB_DB);

  try {
    const form = await readMultipartFormData(event);

    if (!form) throw new Error("No form data received");

    const data = {};
    let logoFile;

    for (const field of form) {
      if (field.type === "image/png" && field.name === "logo") {
        logoFile = field;
      } else {
        data[field.name] = field.data?.toString(); // ensure strings
      }
    }
    if (!logoFile) throw new Error("Logo file missing");
    // Save the logo file to public/uploads/institutes
    const fileName = `${nanoid()}.png`;
    const uploadsDir = join(process.cwd(), "public/uploads/institutes");
    const filePath = join(uploadsDir, fileName);

    // Ensure upload dir exists (optional: fs.mkdirSync)
    await writeFile(filePath, logoFile.data);

    // Save file URL path
    data.logo = `/uploads/institutes/${fileName}`;

    // Save to DB
    const newInstitute = await institute.create(data);
    return {
      success: true,
      message: "Institute request saved successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to save institute request.",
      error: error.message,
    };
  }
});
