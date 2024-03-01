<template>
    <main class="w-screen min-h-screen flex justify-center align-middle bg-gray-800 ">
        <div class="md:px-[60px] px-[20px] min-w-full flex flex-col justify-center items-center">
            <Search v-show="!isLoad" @searchPackages="searchPackages"></Search>
            <TablePackages @showDetails="openDialog" :packages="packages" v-if="isShowTable"></TablePackages>
            <Pagination v-show="isShowTable" @changePagination="changePagination"></Pagination>
            <Dialog @closeDialog="closeDialog" :currentPackage="currentPackage" v-if="isDialogOpen"></Dialog>
            <Loader :isShow="isLoad"></Loader>
            <NotFound :query="notFoundInfo.query" v-if="notFoundInfo.isNotFound"></NotFound>
        </div>
    </main>
</template>
  
<script>
import TablePackages from '@/components/TablePackages.vue';
import Search from '@/components/Search.vue';
import Pagination from '@/components/Pagination.vue';
import Dialog from '@/components/Dailog.vue'
import Loader from '@/components/Loader.vue';

import { useStore } from 'vuex';
import { computed, reactive, ref } from 'vue';
import NotFound from '@/components/NotFound.vue';

  
export default {
    setup() {
        const store = useStore();

        let isDialogOpen = ref(false);
        let notFoundInfo = reactive({
            isNotFound: false,
            query: ''
        });

        let namePackages = ref('');
        let requestPackagesFrom = 0;
        let isLoad = ref(false);

        const packages = computed(() => {
            return store.getters.getPackages;
        })
        
        const isPackages = computed(() => {
          return !!store.getters.getPackages.length;
        });

        const currentPackage = computed(() => {
          return store.getters.getCurrentPackage;
        });

        const isShowTable = computed(() => {
            return isPackages.value && !isLoad.value && !notFoundInfo.isNotFound
        })

        const searchPackages = async (name) => {
            namePackages.value = name;
            isLoad.value = true;
            await store.dispatch('requestSearchPackagesByName', {namePackages: namePackages.value});
            isLoad.value = false;
            if(!isPackages.value) {
                notFoundInfo.isNotFound = !isPackages.value;
                notFoundInfo.query = name;
            }
            else {
                notFoundInfo.query = '';
                notFoundInfo.isNotFound = false;
            }

        }
        const requestPackage = async (namePackege) => {
            isLoad.value = true;
            await store.dispatch('requestPackage', namePackege);
            isLoad.value = false;
            
        }

        const changePagination = async (startFrom) => {
            requestPackagesFrom = startFrom;
            isLoad.value = true;
            await store.dispatch('requestSearchPackagesByName', {namePackages : namePackages.value, from: requestPackagesFrom});
            isLoad.value = false;
        }

        const closeDialog = () => {
            isDialogOpen.value = false;
        }

        const openDialog = async (namePackege) => {
            isLoad.value = true;
            await requestPackage(namePackege);
            isLoad.value = false;
            if(!currentPackage.value.name) {
                isDialogOpen.value = false;
                notFoundInfo.query = namePackege;
                notFoundInfo.isNotFound = true;
            }
            else {
                isDialogOpen.value = true;
                notFoundInfo.query = '';
                notFoundInfo.isNotFound = false;
            }

        }

        return {
            isPackages,
            isDialogOpen,
            isLoad,
            isShowTable,

            notFoundInfo,

            packages,
            currentPackage,
            namePackages,
            closeDialog,
            openDialog,
            changePagination,
            searchPackages
        }
    },
    components: { Search, TablePackages, Pagination, Dialog, Loader, NotFound }
}
  
</script>
  
<style ></style>
  