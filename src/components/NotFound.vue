<template>
    <div class=" mt-24 text-center text-[28px] text-orange-400">
        Nothing was found for the query: "{{ query }}"
    </div>
</template>

<script>

export default {
    props: {
        query: {
            type: String,
        }
    }
}

</script>