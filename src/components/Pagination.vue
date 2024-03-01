<template>
    <div class="w-full md:px-10 mt-[10px] mb-[10px]">
        <div class="w-full justify-center flex ">
            <button v-if="isShowArrows" :disabled="isDidableLeftArrow" @click="goToPrevPage" 
            class='sm:mx-1 w-8 h-8  md:w-10 md:h-10 rounded-xl disabled:bg-gray-700
            bg-orange-600 text-orange-100 hover:bg-orange-700'>
                <ChevronLeftIcon class="w-8 h-6 md:w-10 md:h-8"></ChevronLeftIcon>
            </button>
            <button @click="goToPage(num)" :class="[{'bg-yellow-400': isCurrentPage(num)}, 'mx-[2px]','md:mx-[4px]',' w-8', 'h-8',
            'text-[16px]', 'md:text-[20px]', 'md:w-10', 'md:h-10', 'rounded-xl', 'bg-orange-600', 'text-xl',
            'text-orange-100', 'hover:bg-orange-700']" 
                 v-for="num in visiblePages()" :key="num"> {{ num }}
            </button>
            <button v-if="isShowArrows" :disabled="isDidableRightArrow" @click="goToNextPage" class='mx-1 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-orange-600
                 text-orange-100 hover:bg-orange-700 disabled:bg-gray-700'>
                <ChevronRightIcon class="w-8 h-6 md:w-10 md:h-8"></ChevronRightIcon>
            </button>
        </div>
        
    </div>
</template>
  
<script>
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { COUNT_REQUESTED_PACKAGES } from '@/constants.js';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup(_, context) {
        const store = useStore();
        const currentPage = ref(1);

        const totalCountPackages = computed(() => {
            return store.getters.getTotalCountPackages;
        });

        const goToPage = (num) => {
            currentPage.value = num;
            const startFrom = (currentPage.value - 1) * COUNT_REQUESTED_PACKAGES;
            context.emit('changePagination', startFrom)
        }

        const goToPrevPage = () => {
            if(currentPage.value > 1) {
                goToPage(currentPage.value - 1);
            }
        }

        const goToNextPage = () => {
            if(currentPage.value < totalCountPackages) {
                goToPage(currentPage.value + 1);
            }
        }

        const totallCountPages = () => {
            if(totalCountPackages.value) {
                return Math.ceil(totalCountPackages.value / COUNT_REQUESTED_PACKAGES);
            }
            return 0;
        }

        const visiblePages = () => {
            const range = 4;
            let start = currentPage.value - range;
            let finish = currentPage.value + range
            if(start < 1) {
                finish += Math.abs(start) + 1;
                start = 1;
            }
            if(finish > totallCountPages()) {
                finish = totallCountPages();
            }
            return Array.from({ length: finish - start + 1 }, (_, i) => start + i)
            
        };

        const isCurrentPage = (num) => {
            return currentPage.value === num;
        };

        const isShowArrows = computed(() => {
            if(totallCountPages() > 2){
                return true;
            }
            return false;
        });

        const isDidableLeftArrow = computed(() => {
            return currentPage.value > 1 ? false : true;
        });

        const isDidableRightArrow = computed(() => {
            return currentPage.value !== totallCountPages() ? false : true;
        });

        return {
            goToPrevPage,
            goToNextPage,
            goToPage,

            totallCountPages,
            visiblePages,
            isCurrentPage,
            isShowArrows,
            isDidableLeftArrow,
            isDidableRightArrow
        }
    },
    components: {ChevronLeftIcon, ChevronRightIcon}
}
  
</script>
  
<style lang="scss" scoped>
@media(max-width: 440px) {
   div button {

    }
}
</style>
  