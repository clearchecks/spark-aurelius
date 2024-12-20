import SparkForm from '../../forms/form.js';

export default {
	props: ['user'],

    /**
     * The component's data.
     */
	data() {
		return {
			form: new SparkForm({})
		}
	},


	methods: {
		/**
		 * Disable two-factor authentication for the user.
		 */
		disable() {
			Spark.delete('/settings/two-factor-auth', this.form)
				.then(() => {
					Bus.$emit('updateUser');
				});
		}
	}
};
