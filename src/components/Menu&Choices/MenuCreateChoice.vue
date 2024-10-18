<template>



    <div class="mb-2 d-flex justify-content-between align-items-center ">
        <h5 class="card-title">{{ isEditMode ? 'Edit Choice' : 'Create Choice' }}</h5>
        <button class="btn btn-outline" type="button" @click="cancelForm"><i class="fa-solid fa-xmark fa-lg"
                style="color: #030303;"></i></button>
    </div>

    <div class="card p-3">
        <form ref="choiceFormRef" @submit.prevent="submitForm" :class="{ 'was-validated': isFormValidated }">
            <div class="mb-3">
                <label for="choiceName" class="form-label">Choice Name</label>
                <input type="text" class="form-control" id="choiceName" v-model="choiceForm.name" required />
            </div>

            <div class="mb-3">
                <label for="min" class="form-label">Optional/Required</label>
                <select class="form-select" id="min" v-model="choiceForm.is_required" required>
                    <option value="0">0 Optional (add-on)</option>
                    <option value="1">1 Required (variations)</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="min" class="form-label">Choice Type</label>
                <select class="form-select" id="min" v-model="choiceForm.choice_type" required>
                    <option v-if="choiceForm.is_required == 1" value="size">Size (Fix Price)</option>
                    <option value="additional">Additional (Add in Price)</option>
                </select>
            </div>

            <div class="mb-3 ">
                <h6>Choices</h6>
                <div class="scroller-card p-1">
                    <!--  -->
                    <div v-for="(item, idx) in choiceForm.choices" :key="idx" class="d-flex align-items-center mb-2">
                        <!-- If isDeleted does not exist, show the inputs and delete button -->

                        <input type="text" class="form-control me-2" v-model="item.name" placeholder="Name" required />
                        <input type="number" class="form-control me-2" v-model="item.price" placeholder="Price"
                            required />
                        <button class="btn" @click.prevent="removeItem(idx, item.id)">
                            <i class="fa-regular fa-trash-can fa-lg" style="color: #5c6066;"></i>
                        </button>


                        <!-- If isDeleted exists, show a message or any alternate content -->
                    </div>

                    <div v-if="isEditMode">
                        <div v-for="(item, idx) in choiceForm.new_choices" :key="idx"
                            class="d-flex align-items-center mb-2">
                            <input type="text" class="form-control me-2" v-model="item.name" placeholder="Name"
                                required />
                            <input type="number" class="form-control me-2" v-model="item.price" placeholder="Price"
                                required />
                            <button class="btn" @click.prevent="removeItem(idx, item.id)">
                                <i class="fa-regular fa-trash-can fa-lg" style="color: #5c6066;"></i>
                            </button>
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="btn btn-success" type="button" @click="addItem">Add</button>
                </div>
            </div>

            <div class="d-flex justify-content-end pt-2 ms-2">
                <button class="btn btn-primary me-2" type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
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
    name: '',
    choice_type: '',
    is_required: '0',
    choices: [{ name: '', price: 0 }],
    new_choices: [{ name: '', price: 0 }],
});

const addItem = () => {
    if (props.isEditMode) {
        choiceForm.new_choices.push({ name: '', price: 0 });
    } else {
        choiceForm.choices.push({ name: '', price: 0 });
    }
};

const removeItem = (index, id) => {
    if (choiceForm.choices.length > 1 || choiceForm.new_choices.length > 1) {
        console.log("remove chl")
        if (props.isEditMode) {
            // For existing choices, mark as deleted
            if (choiceForm.choices.length > 0 && id) {
                choiceForm.choices.splice(index, 1);
            }
            // For new choices, just remove it from the array
            else if (choiceForm.new_choices.length > 0) {
                choiceForm.new_choices.splice(index, 1);
            }
        }
        // When not in edit mode, just remove the choice
        else {
            choiceForm.choices.splice(index, 1);
            console.log(choiceForm.choices);
        }
    }
};

const resetForm = () => {
    choiceForm.name = '';
    choiceForm.is_required = '0';
    choiceForm.choice_type = '';
    choiceForm.choices = [{ name: '', price: 0 }];
    choiceForm.new_choices = [{ name: '', price: 0 }];
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
<style scoped>
.scroller-card {
    max-height: 130px;
    overflow-y: auto;
}
</style>
