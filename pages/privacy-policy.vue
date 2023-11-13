<template>
    <div class="flex flex-col justify-center w-full">
        <CommonLayout>
            <div class="flex w-full items-center justify-center">

                <div class="flex flex-col w-[59rem] h-full justify-center items-start py-12  gap-[52px]">
                    <div class="flex flex-row items-center justify-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M11.7891 2.75788V1.37752C11.7891 1.25788 11.6516 1.19181 11.5587 1.26502L3.50873 7.55252C3.44034 7.60571 3.38499 7.67382 3.34692 7.75165C3.30885 7.82948 3.28906 7.91498 3.28906 8.00163C3.28906 8.08827 3.30885 8.17377 3.34692 8.2516C3.38499 8.32944 3.44034 8.39755 3.50873 8.45074L11.5587 14.7382C11.6534 14.8115 11.7891 14.7454 11.7891 14.6257V13.2454C11.7891 13.1579 11.748 13.0739 11.6802 13.0204L5.25159 8.00252L11.6802 2.98288C11.748 2.92931 11.7891 2.84538 11.7891 2.75788Z"
                                fill="black" fill-opacity="0.85" />
                        </svg>

                        <a @click="redirectBack" class="text-center underline text-[#343541] text-sm">Back to Home</a>

                    </div>
                    <span class="font-bold text-[#1C355E] text-2xl"> Privacy Policy</span>

                    <span class="font-semibold text-[#1C355E] text-sm">Last Modified: 01 Oct 2023</span>

                    <div class="flex flex-col w-full items-start justify-center gap-6">
                        <p class="text-sm font-normal ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta
                            sit
                            amet turpis ac viverra. Suspendisse vel diam eros. Etiam a erat ante. Donec elementum posuere
                            felis,
                            porta porttitor erat ultrices sit amet. Vestibulum risus orci, dictum ac efficitur a, laoreet
                            eget
                            nibh. Sed non pulvinar sapien, quis rhoncus nibh. Sed facilisis condimentum augue. Proin tempus
                            arcu
                            dapibus, faucibus elit sit amet, faucibus orci. Sed a eleifend neque. Aliquam erat volutpat.
                            Etiam
                            vel nibh non lacus convallis aliquet quis a erat.</p>
                        <p class="text-sm font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta
                            sit
                            amet turpis ac viverra. Suspendisse vel diam eros. Etiam a erat ante. Donec elementum posuere
                            felis,
                            porta porttitor erat ultrices sit amet. Vestibulum risus orci, dictum ac efficitur a, laoreet
                            eget
                            nibh. Sed non pulvinar sapien, quis rhoncus nibh. Sed facilisis condimentum augue. Proin tempus
                            arcu
                            dapibus, faucibus elit sit amet, faucibus orci. Sed a eleifend neque. Aliquam erat volutpat.
                            Etiam
                            vel nibh non lacus convallis aliquet quis a erat.</p>
                        <p class="text-sm font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta
                            sit
                            amet turpis ac viverra. Suspendisse vel diam eros. Etiam a erat ante. Donec elementum posuere
                            felis,
                            porta porttitor erat ultrices sit amet. Vestibulum risus orci, dictum ac efficitur a, laoreet
                            eget
                            nibh. Sed non pulvinar sapien, quis rhoncus nibh. Sed facilisis condimentum augue. Proin tempus
                            arcu
                            dapibus, faucibus elit sit amet, faucibus orci. Sed a eleifend neque. Aliquam erat volutpat.
                            Etiam
                            vel nibh non lacus convallis aliquet quis a erat.</p>

                        <div class="flex flex-col items-start w-full gap-2">
                            <span class="text-base font-semibold">I. COLLECTION OF PERSONAL DATA</span>
                            <span class="text-sm font-normal">Praesent hendrerit lobortis arcu, a varius ex rhoncus
                                eu:</span>
                        </div>
                        <ul class="flex flex-col items-start w-full gap-2 px-6">
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                        </ul>

                        <div class="flex flex-col items-start w-full gap-2">
                            <span class="text-base font-semibold">II. USE OF PERSONAL DATA</span>
                            <span class="text-sm font-normal">Praesent hendrerit lobortis arcu, a varius ex rhoncus
                                eu:</span>
                        </div>
                        <ul class="flex flex-col items-start w-full gap-2 px-6">
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                            <li class="text-sm font-normal list-disc">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Eos, similique.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </CommonLayout>
    </div>
</template>

<script lang="ts">
import CommonLayout from '../components/common/CommonLayout.vue';
import { localStorageBrowser } from '../components/common/utils/cache';
export default {
    components: { CommonLayout },
    methods: {
        redirectBack() {
            this.$router.push(localStorageBrowser.getItem('register-path'))
        }
    }
}
</script>

