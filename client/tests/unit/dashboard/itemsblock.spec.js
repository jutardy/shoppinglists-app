import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import ItemsBlock from '@/components/dashboard/ItemsBlock.vue';
import Vue from 'vue';

describe('ItemsBlock.vue', () => {
    let wrapper = {};

    beforeEach(() => {
        const localVue = createLocalVue();
        const $events = new Vue();
        const loading = false;
        wrapper = shallowMount(ItemsBlock, {
            localVue,
            mocks: { $events },
            propsData: { loading }
        });
    });

    it('renders props.msg when passed', () => {
        expect(wrapper.vm.isLoading).to.be.false;
    });
});
