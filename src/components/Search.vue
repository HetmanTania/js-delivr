<template>
    <div class=" mt-[10px] mb-[10px] w-full flex flex-col justify-center items-start">
        <div class="relative w-full flex justify-center items-center">
            <input v-model.lazy="searchText" @change="findPackage" class="relative w-full h-16 rounded-full 
                    bg-gray-200 p-5 text-xl text-gray-500 placeholder-gray-600" 
                    type="text" placeholder="Find package"/>
            <MagnifyingGlassIcon class="icon w-8 absolute"></MagnifyingGlassIcon>
        </div>
        <div v-if="isSearchTextIncludePercent(searchText)" class=" mt-[10px] text-[16px] text-red-300">
            The request must not contain the % symbol
        </div>
    </div>
   
</template>
  
<script>
import { ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
  
export default {
    setup(_, context) {
        const searchText = ref('');

        const findPackage = () => {
            const text = searchText.value.trim();
            if(text.length && !isSearchTextIncludePercent(text)) {
                context.emit('searchPackages', searchText.value)
            }
        }

        const isSearchTextIncludePercent = (text) => {
            return text.includes('%')
        }

        return {
            searchText,
            findPackage,
            isSearchTextIncludePercent,
        }
    },
    components: {MagnifyingGlassIcon}
}
  
</script>
  
<style lang="scss">
.icon {
    left: calc(95% - 32px);
}
</style>
  