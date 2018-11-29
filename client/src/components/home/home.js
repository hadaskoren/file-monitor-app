export default {
  name: 'home',
  components: {},
  props: [],
  data () {
    return {
      showLogout: false
    };
  },
  computed: {
    username: {
      get() {
        return this.$store.state.username;
      }
    }
  },
  methods: {
    /*
     *
     * This method will be called when a user clicks the 'logout' button and will update the username back to ''
     *
     * */
    logout() {
      this.$store.dispatch('updateUsername', '');

      fetch('http://localhost:3128/logout',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({})
        })
        .then((res) => {
          this.showLogout = false;
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
