<template>
    
</template>

<script>
function check_sync(form){
    let flag = true;
    for (const unit of form.unit_list) {
        if (unit.sync == false) {
            flag = false;
        }
    }
    return flag;
}
function init(Vue, form){
    for (let unit of form.unit_list) {
        if (unit.type === 2) {
            Vue.$ajax.post(unit.option_url)
            .then((res) => {
                if (res.data.code === 200){
                    unit.option_list = res.data.data;
                    unit.sync = true;
                    if (Vue.$form.check_sync(form)) {
                        form.sync = true;
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    } 
}
export default {
    check_sync,
    init
}
</script>

<style>

</style>
