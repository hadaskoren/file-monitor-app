
export default {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {
      isLoginClicked: false,
      isValidUser: false,
      input: {
        username: '',
        password:''
      }
    };
  },
  methods: {
    /*
     *
     * This method will be called when a user clicks the 'login' button and will check is that username and password
     * is listed in the database.
     *
     * */
    login(e) {
      e.preventDefault();
      this.isLoginClicked = true;
      fetch('http://localhost:3128/login',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({username: this.input.username, password: this.input.password})
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if(data.message[0]) {
            this.isValidUser = true;
            this.$store.dispatch('updateUsername', this.input.username);
            this.$router.push('/file-monitor');
          }
        })
        .catch((err) => {
          this.isValidUser = false;
          console.error(err);
      });
    }
  }
}
