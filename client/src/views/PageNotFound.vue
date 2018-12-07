<template>
    <div class="page-not-found view-container">
        <h1 class="mb-4">Page not found</h1>
        <p>Sorry but the page you have requested cannot be found.</p>
        <a
            class="btn btn-primary mt-2"
            tabindex
            @click="$router.go(-1)">Go back</a>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound'
};
</script>
