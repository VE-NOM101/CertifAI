<template>
    <div class="flex justify-center items-center px-4 py-2">
        <UForm :schema="schema" :state="state" @submit="submitForm"
            class="w-full max-w-4xl space-y-6 bg-white/20 dark:bg-black/20 backdrop-blur-xl border rounded-xl p-6 shadow-lg">
            <!-- Row: Name + Code -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField name="name" label="Institute Name">
                    <UInput v-model="state.name" type="text" placeholder="e.g. University of Example" class="w-full" />
                </UFormField>

                <UFormField name="code" label="Institute Code (ROR ID - Optional)">
                    <UInput v-model="state.code" type="text" placeholder="e.g. 05hj8rv76" class="w-full" />
                </UFormField>
            </div>

            <!-- Row: Type + Acronym -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField name="type" label="Type">
                    <USelect v-model="selectedType" :items="typeOptions" class="w-full" />
                </UFormField>

                <UFormField name="acronym" label="Acronym / Short Name">
                    <UInput v-model="state.acronym" type="text" placeholder="e.g. MIT, WHO" class="w-full" />
                </UFormField>
            </div>

            <!-- Row: Location + Website -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField name="location" label="Location">
                    <UInput v-model="state.location" type="text" placeholder="e.g. Boston, USA" class="w-full" />
                </UFormField>

                <UFormField name="website" label="Website Link">
                    <UInput v-model="state.website" type="url" placeholder="e.g. https://example.org" class="w-full" />
                </UFormField>
            </div>

            <!-- Row: Wikipedia + Logo Upload -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField name="wikipedia" label="Wikipedia Link (Optional)">
                    <UInput v-model="state.wikipedia" type="url"
                        placeholder="e.g. https://en.wikipedia.org/wiki/Example" class="w-full" />
                </UFormField>

                <UFormField name="logo" label="Upload Logo (.png only)">
                    <UInput icon="i-teenyicons-png-outline" type="file" accept=".png" class="w-full"
                        @change="handleFileUpload" />
                </UFormField>
            </div>

            <!-- Description -->
            <UFormField name="description" label="Description (Optional)">
                <UTextarea v-model="state.description" placeholder="Short description of the institution..."
                    class="w-full" />
            </UFormField>

            <!-- Submit -->
            <div class="flex justify-end">
                <UButton loading-icon="hugeicons:reload" color="primary" type="submit">
                    Request for institute
                </UButton>
            </div>
        </UForm>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import Joi from 'joi'

const typeOptions = [
    { label: 'Educational', value: 'educational' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Scientific', value: 'Scientific' },
    { label: 'Others', value: 'others' }
]

const selectedType = ref('others')

const state = reactive({
    name: '',
    code: '',
    type: 'others',
    acronym: '',
    location: '',
    website: '',
    wikipedia: '',
    description: '',
    logo: null
})

// Sync selectedType -> state.type
watch(selectedType, (val) => {
    state.type = val
})

const schema = Joi.object({
    name: Joi.string().required().label('Institute Name').max(100),
    code: Joi.string().label('Institute Code').allow('', null),
    type: Joi.string().required().label('Institute Type').valid('educational', 'commercial', 'Scientific', 'others'),
    acronym: Joi.string().label('Acronym or short-name').max(20).required(),
    location: Joi.string().required().label('Location'),
    website: Joi.string().uri().required().label('Website Link'),
    wikipedia: Joi.string().uri().allow('', null).label('Wikipedia Link'),
    description: Joi.string().max(1000).allow('', null).label('Description'),
    logo: Joi.any()
        .required()
        .custom((value, helpers) => {
            if (!value) {
                return helpers.error('any.required')
            }

            if (!(value instanceof File)) {
                return helpers.error('file.base')
            }

            if (!['image/png'].includes(value.type)) {
                return helpers.error('file.format', { format: '.png' })
            }

            return value // valid
        })
        .messages({
            'any.required': 'Logo is required.',
            'file.base': 'Uploaded file must be a valid image.',
            'file.format': 'Only .png file allowed.',
        }),
})

// Handle file input
function handleFileUpload(e) {
    const file = e.target.files[0]
    state.logo = file
}

// Form submit
function submitForm() {
    console.log('Form Validated & Submitted:', state)

    const formData = new FormData()
    for (const key in state) {
        formData.append(key, state[key])
    }

    // You can send formData using fetch or axios
    // fetch('/api/institutes', { method: 'POST', body: formData })
}
</script>
