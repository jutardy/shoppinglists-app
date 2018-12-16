<template>
    <div class="documentation-page view-container container">
        <h1 class="m-b-50">Documentation Page</h1>
        <nav class="nav nav-pills m-b-30 cursor-pointer">
            <a
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active : index==activeTab }"
                class="nav-link"
                @click="activeTab=index">{{ tab.label }}</a>
        </nav>
        <div class="text-left doc-body block-shadow">
            <component :is="tabs[activeTab].component" />
        </div>
    </div>
</template>

<script>
import Backend from '@/components/documentation/Backend.vue';
import Deployment from '@/components/documentation/Deployment.vue';
import Frontend from '@/components/documentation/Frontend.vue';
import MoreInfo from '@/components/documentation/MoreInfo.vue';
import Overview from '@/components/documentation/Overview.vue';

export default {
    name: 'Documentation',
    data () {
        return {
            tabs: [
                { label: 'Overview', component: Overview },
                { label: 'Backend', component: Backend },
                { label: 'Frontend', component: Frontend },
                { label: 'Deployment', component: Deployment },
                { label: 'More info', component: MoreInfo }
            ],
            activeTab: 0
        };
    },
    mounted () {

    }
};
</script>

<style lang="scss">
.doc-body {
    background: #EFEFF0;
    padding: 20px;
    border-radius: 3px;

    p { margin-bottom: 10px !important; }
    h5 {
        font-size: 18px;
        font-weight: 400 !important;
    }
    ul.doc-list {
        margin-left: 40px;
        list-style: circle;
        li { list-style-type: circle; }
    }
    b { font-weight: 600; }
    pre { margin: 5px 0 10px; }
    pre, code {
        color: $grey-dark;
        font-size: 14px;
        line-height: 1.4 !important;
    }
}
</style>
