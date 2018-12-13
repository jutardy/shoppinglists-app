import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import ItemsBlock from '@/components/dashboard/ItemsBlock.vue';
import vueNumeralFilter from 'vue-numeral-filter';
import Vue from 'vue';

describe('ItemsBlock.vue', () => {
    let wrapper = {};
    const localVue = createLocalVue();
    const $events = new Vue();

    beforeEach(() => {
        localVue.use(vueNumeralFilter, { locale: 'en-gb' });
        wrapper = shallowMount(ItemsBlock, {
            localVue,
            mocks: { $events },
            propsData: { loading: false }
        });
    });

    it('sets isLoading to false when sent prop is false', () => {
        expect(wrapper.vm.isLoading).to.be.false;
    });
    it('sets isLoading to true when sent prop is true', () => {
        wrapper = shallowMount(ItemsBlock, {
            localVue,
            mocks: { $events },
            propsData: { loading: true }
        });
        expect(wrapper.vm.isLoading).to.be.true;
    });

    describe('setting isLoading = true', () => {
        beforeEach(() => {
            wrapper.setProps({ loading: true });
        });
        it('should hide error-block', () => {
            expect(wrapper.find('.error-block').isVisible()).to.be.false;
        });
        it('should hide data-block', () => {
            expect(wrapper.find('.data-block').isVisible()).to.be.false;
        });
    });

    describe('triggering updatedItems method', () => {
        let items = {};

        describe('with hasError = false', () => {
            const numZero = 0;
            const numOne = 1;

            beforeEach(() => {
                items = { data: numZero, hasError: false };
                wrapper.vm.updateItems(items);
            });

            it('should hide error-block', () => {
                expect(wrapper.find('.error-block').isVisible()).to.be.false;
            });
            it('should show data-block', () => {
                expect(wrapper.find('.data-block').isVisible()).to.be.true;
            });

            describe(`with data = ${numZero}`, () => {
                it(`num div should contain text = ${numZero}`, () => {
                    expect(wrapper.find('.num').text()).to.equal(numZero.toString());
                });
                it('itemsPluralized computed property = "items"', () => {
                    expect(wrapper.vm.itemsPluralized).to.equal('items');
                });
            });

            describe(`with data = ${numOne}`, () => {
                beforeEach(() => {
                    items = { data: numOne, hasError: false };
                    wrapper.vm.updateItems(items);
                });
                it(`num div should contain text = ${numOne}`, () => {
                    expect(wrapper.find('.num').text()).to.equal(numOne.toString());
                });
                it('itemsPluralized computed property = "item"', () => {
                    expect(wrapper.vm.itemsPluralized).to.equal('item');
                });
            });
        });

        describe('with hasError = true', () => {
            beforeEach(() => {
                items = { data: 0, hasError: true };
                wrapper.vm.updateItems(items);
            });

            it('should show error-block', () => {
                expect(wrapper.find('.error-block').isVisible()).to.be.true;
            });
            it('should hide data-block', () => {
                expect(wrapper.find('.data-block').isVisible()).to.be.false;
            });
        });
    });
});
