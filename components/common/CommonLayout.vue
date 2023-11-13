<template>
    <div class="flex flex-col justify-center w-full h-full">
        <Header />
        <div class="flex h-full w-full items-center justify-center">
            <slot />
        </div>
    </div>
</template>

<script>
import Header from '../common/Header.vue'
export default {
    components: { Header },
}
</script>

