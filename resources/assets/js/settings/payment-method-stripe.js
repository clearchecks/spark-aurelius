export default {
    props: ['user', 'team', 'billableType'],


    /**
     * Load mixins for the component.
     */
    mixins: [
        require('./../mixins/discounts')
    ],


    /**
     * The component's data.
     */
    data() {
        return {
            currentDiscount: null,
            loadingCurrentDiscount: false
        };
    },


    /**
     * The component has been created by Vue.
     */
    created() {
        var self = this;

        this.$on('updateDiscount', function(){
            self.getCurrentDiscountForBillable(self.billableType, self.billable);

            return true;
        })
    },

    /**
     * Prepare the component.
     */
    mounted() {
        this.getCurrentDiscountForBillable(this.billableType, this.billable);
    },
};
