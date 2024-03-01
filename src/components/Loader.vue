<template>
    <div v-show="isShow" class=" w-full flex justify-center">
        <div class="loader rounded-full w-full h-16 border border-black ">
            <div ref="loaderLine" class="loaderLine w-0 h-[64px] rounded-full bg-orange-500"></div>
        </div>
    </div>
 
</template>

<script>
import { ref, watch } from 'vue';

export default {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const loaderLine = ref(null);

        watch(() => props.isShow, (newValue) => {
            if(newValue) {
                loaderLine.value.classList.add('animate');
            }
            else {
                loaderLine.value.classList.remove('animate');
            }
        })

        return {
            loaderLine
        }
    }
}
</script>

<style lang="scss">
.loader {
  .loaderLine{
        &.animate {
            animation: load 2s ease forwards;
        }
    }
}


@keyframes load {
    100% {
        width: 100%;
    }
}
</style>