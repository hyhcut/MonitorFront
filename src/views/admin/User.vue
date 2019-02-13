<template>
    <div id="user">
        <user-list :data-list="data_list" :col-list="col_list"></user-list>
    </div>
</template>

<script>
import UserList from '@/components/UserList.vue'

export default {
    components:{
        'user-list': UserList
    },
    data(){
        return{
            data_list:[],
            col_list:[
                {
                    name: 'username',
                    label: '用户名'
                },
                {
                    name: 'power',
                    label: '权限代码'
                },
                {
                    name: 'last_time',
                    label: '最后登陆时间'
                }
            ]
        }
    }
}
</script>

<style>

</style>
