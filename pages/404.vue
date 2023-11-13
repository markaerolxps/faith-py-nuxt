<template>
    <div class="flex flex-col justify-center w-full h-screen">
        <CommonLayout>


            <div class="flex flex-col w-[50rem] h-full justify-center items-center   gap-[56px]">

                <img src="../../assets/img/page-not-found.png" class="w-[33.109] h-[22.073rem]" alt="not-found-img" />



                <div class="flex flex-col w-[33.938rem] items-center justify-center px-4 gap-4">
                    <p class="text-sm font-normal text-center ">Sorry for the inconvenience. This page is currently
                        unavailable!</p>



                </div>

            </div>

        </CommonLayout>
    </div>
</template>

<script>
import CommonLayout from '../components/common/CommonLayout.vue';

export default {
    components: { CommonLayout },

}
</script>

