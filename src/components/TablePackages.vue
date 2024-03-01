<template>
    <table class="w-full text-[20px] sm:text-[26px] mt-10 text-orange-200 table-auto">
        <thead class=" border-double border-b-2 border-orange-700">
            <tr class=" text-orange-400">
                <td>Name</td>
                <td class="text-end">Last Version</td>
            </tr>
        </thead>
        <tbody>
            <tr @click="showDetails(pckg.package.name)" class="cursor-pointer" v-for="pckg in packages">
                <td class=" max-w-[550px] p-1">{{ pckg.package.name }}</td>
                <td class="text-end">{{ pckg.package.version }}</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
  
export default {
    props: {
        packages: {
            typeof: Array,
            required: true,
        }
    },
    setup(_, context) {

        const showDetails = (namePackege) => {
            context.emit('showDetails', namePackege)
        }


        return {
            showDetails
        }
    },
    components: {}
}
  
</script>
  
<style ></style>
  