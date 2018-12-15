<template>
    <div class="about-page view-container">
        <div class="about-card block-shadow d-block bg-white d-flex">
            <div class="img-container">
                <img
                    class="img-profile rounded-circle"
                    src="https://media.licdn.com/dms/image/C5103AQFRdheTVU2YUg/profile-displayphoto-shrink_200_200/0?e=1550102400&v=beta&t=DjPAYn7lPUVuZZf0dOigQjC646jFrRDLD1s0nP-9PO4"
                    width="120"
                    height="120">
            </div>
            <div class="card-info flex-grow-1 align-self-center text-left p-l-30">
                <h4 class="card-name m-b-0">Julien Tardy</h4>
                <div class="card-job text-black-50 m-b-15">Software Developer</div>

                <a
                    class="email d-inline-block m-r-10 v-a-middle"
                    href="mailto:jutardy@gmail.com">
                    <i class="fa fa-envelope fs-20" aria-hidden="true"/>
                </a>
                <a
                    class="linkedin d-inline-block v-a-middle"
                    href="https://www.linkedin.com/in/jutardy/">
                    <i class="fa fa-linkedin fs-20" aria-hidden="true" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About'
};
</script>

<style lang="scss" scoped>
.about-card {
    width: 400px;
    margin: 40px auto;
    padding: 30px;
    border-radius: 3px;

    @media #{$xxs-max} {
        width: 100%;
    }

    .card-info {
        h4 {
            color: $blue;
            font-weight: 700 !important;
        }
        a {
            color: $border-block;
            &.email:hover { color: $blue; }
            &.linkedin:hover { color: #0073b1; }
        }
    }
}
</style>
