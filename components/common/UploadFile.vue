<template>
    <div class="flex flex-col items-start w-full gap-1">
        <div class="flex-row items-start w-full gap-1">
            <label class="text-sm font-normal">{{ title }}</label>
            <span class="text-sm font-normal text-[#FF4D4F]">*</span>
        </div>

        <div class="relative rounded-md flex items-center" v-if="!fileData"
            style="padding: 4px 12px;border: 1px solid var(--neutral-5, #D9D9D9);" @click="$refs[refName].click()">
            <span class="text-sm">Attach</span>
            <input v-bind="$attrs" class="border bg-[#F5F5F5] rounded-lg left-0 font-normal text-sm absolute w-full h-[50%] z-10 pointer-events-none opacity-0"  :ref="refName" type="file"
                style="padding: 8px 12px;" placeholder="Attach" @change="uploadFileFunc" />
        </div>

        <div class="flex bg-[#F5F5F5] h-[4.25rem] flex-row justify-between rounded-lg w-full font-normal text-sm items-center v-if="
            v-if="fileData" style=" padding: 4px 12px;border: 1px solid var(--neutral-5,
                                #D9D9D9);">
            <span class="text-xs">{{ fileData.name }}</span>
            <div class="flex flex-col gap-1 py-2">
                <div class=" rounded-md flex items-center h-[1.5rem]"
                    style="padding: 4px 12px;border: 1px solid var(--neutral-5, #D9D9D9);background: var(--neutral-1, #FFF);"
                    @click="$refs[refName].click()">
                    <span class="text-sm">Reload File</span>
                    <input class=" bg-[#F5F5F5] rounded-lg w-full font-normal text-sm" hidden :ref="refName" type="file"
                        style="padding: 8px 12px;" @change="uploadFileFunc" />
                </div>
                <div class=" rounded-md flex items-center h-[1.5rem]"
                    style="padding: 4px 12px;border: 1px solid var(--neutral-5, #D9D9D9);background: var(--neutral-1, #FFF);"
                    @click="clearFile">
                    <span class="text-sm">Clear</span>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: 'Yes',
        },
        refName: {
            type: String,
            required: false,
            default: 'Yes',
        },
    },
    data() {
        return {
            fileData: null
        }
    },
    methods: {
        uploadFileFunc() {
            let file = this.$refs[this.refName].files[0];
            if (file) {

                if (file.type.startsWith('image')) {
                    file.fileType = 'image';
                } else {
                    return;
                }

                if (file.fileType === 'image') {
                    let fr = new FileReader();
                    fr.onload = () => {
                        file.data = fr.result;
                        this.fileData = file;
                        this.$emit('uploadFile', file);
                    };
                    fr.readAsDataURL(file);
                } else {
                    this.fileData = file;
                    this.$emit('uploadFile', file);
                }
            }

        },
        clearFile() {
            this.fileData = null;
            this.$emit('uploadFile', null);
        }
    },

}
</script>

