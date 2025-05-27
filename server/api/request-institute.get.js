import institute from "~/model/institute";
import { connectToDatabase } from "~/utils/mongoose";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  await connectToDatabase(config.MONGODB_URI, config.MONGODB_DB);

  try {
    const query = getQuery(event);
    const filter = {};

    if (query.owner) {
      filter.owner = query.owner;
    }

    const allInstitutes = await institute.find(filter);

    return {
      success: true,
      message: "Institute data fetched successfully.",
      data: allInstitutes,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch institute data.",
      error: error.message,
    };
  }
});
