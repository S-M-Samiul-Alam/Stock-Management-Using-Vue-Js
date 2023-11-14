<template>
    <div>
        <div class="container row align-items-center justify-content-center">
            <div class="col-md-4">
                <p>Dashboard</p>
                <p><RouterLink to="/dashboard/category">Category</RouterLink></p>
                <p><RouterLink to="/dashboard/add-category">Add Category</RouterLink></p>
                <p><RouterLink to="/dashboard/stock-category">stock Category</RouterLink></p>
                <p><RouterLink to="/dashboard/product-add">add product</RouterLink></p>
            </div>
            <div class="col-md-8">
                <RouterView/>
            </div>
        </div>
    </div>
</template>

<script>
export default{
  
}

</script>

<style scoped>

</style>