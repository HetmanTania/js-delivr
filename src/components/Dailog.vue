<template>
    <div @click="close" class="fixed top-0 flex justify-center items-center w-screen h-screen bg-gray-800 bg-opacity-80">
        <div class="p-5 inset-0 w-4/5 h-4/5 md:w-4/6 md:h-4/6 bg-gray-200 rounded-3xl">
            <div class="w-full text-[20px] sm:text-[22px] text-gray-800">
                <div class="flex flex-col sm:flex-row sm:justify-between w-full border-b-2 border-orange-300">
                    <div class="p-[10px]">Name</div>
                    <div class="p-[10px] text-end">{{ currentPackage.name }}</div>
                </div>
                <div v-for="tag in Object.keys(currentPackage.tags)" :key="tag" 
                    class="flex flex-col sm:flex-row sm:justify-between  w-full border-b-2 border-orange-300">
                    <div class="p-[10px] ">{{ tag }}</div>
                    <div class="p-[10px] text-end">{{ currentPackage.tags[tag] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
export default {
    props: {
        currentPackage: {
            required: true,
            type: Object
        },
    },
    setup(_, context) {

        const close = () => {
            context.emit('closeDialog');
        }

        return {
            close
        }
    }
}

</script>