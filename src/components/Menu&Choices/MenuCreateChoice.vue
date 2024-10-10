<template>
    <div class="card p-4">
        <h5>{{ isEditMode ? 'Edit Choice' : 'Create Choice' }}</h5>
        <form ref="choiceFormRef" @submit.prevent="submitForm" :class="{ 'was-validated': isFormValidated }">
            <div class="mb-3">
                <label for="choiceName" class="form-label">Choice Name</label>
                <input type="text" class="form-control" id="choiceName" v-model="choiceForm.choiceName" required />
            </div>

            <div class="mb-3">
                <label for="min" class="form-label">Min</label>
                <select class="form-select" id="min" v-model="choiceForm.min" required>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>
            </div>

            <div class="mb-3">
                <h6>Choices</h6>
                <div v-for="(item, idx) in choiceForm.items" :key="idx" class="d-flex align-items-center mb-2">
                    <input type="text" class="form-control me-2" v-model="item.name" placeholder="Name" required />
                    <input type="number" class="form-control me-2" v-model="item.price" placeholder="Price" required />
                    <button class="btn btn-danger" @click.prevent="removeItem(idx)"
                        :disabled="choiceForm.items.length === 1">
                        Delete
                    </button>
                </div>
                <button class="btn btn-success mt-2" type="button" @click="addItem">Add Choice</button>
            </div>

            <div class="mt-3">
                <button class="btn btn-primary me-2" type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
                <button class="btn btn-secondary" type="button" @click="cancelForm">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    choice: Object,
    isEditMode: Boolean,
});

const emits = defineEmits(['save', 'cancel']);

const choiceFormRef = ref(null);
const isFormValidated = ref(false);

const choiceForm = reactive({
    choiceName: '',
    min: '0',
    items: [{ name: '', price: 0 }],
});

const addItem = () => {
    choiceForm.items.push({ name: '', price: 0 });
};

const removeItem = (index) => {
    if (choiceForm.items.length > 1) {
        choiceForm.items.splice(index, 1);
    }
};

const resetForm = () => {
    choiceForm.choiceName = '';
    choiceForm.min = '0';
    choiceForm.items = [{ name: '', price: 0 }];
};

watch(
    () => props.choice,
    (newChoice) => {
        if (newChoice) {
            Object.assign(choiceForm, newChoice);
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

const submitForm = () => {
    isFormValidated.value = true;

    // If the form is valid, emit save event
    if (choiceFormRef.value.checkValidity()) {
        emits('save', { ...choiceForm });
        isFormValidated.value = false;
    } else {
        // This triggers the native validation tooltips
        choiceFormRef.value.reportValidity();
    }
};

const cancelForm = () => {
    emits('cancel');
};
</script>
