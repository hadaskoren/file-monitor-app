export default {
  name: 'file-monitor',
  data () {
    return {
        isMonitoring: false,
        interval: null,
        input: {
          folder: ''
        },
        logs: []
    };
  },
  created() {
    this.stopMonitoring();
    this.logs = [];
    this.isMonitoring = false
  },
  methods: {
    /*
     *
     * This method will be called when a user clicks the 'start' button and will call the 'getStatus'
     * method every second to get the logs array that was updated in the server.
     *
     * */
    startMonitoring() {
      this.isMonitoring = true;
      fetch('http://localhost:3128/start',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({folder: this.input.folder})
        }).then((res) => {
            this.interval = setInterval(this.getStatus, 1000)
          })
          .catch((err) => {
              console.log(err);
          });
    },
    /*
     *
     * This method will be called every second by 'startMonitoring' function and will update the logs.
     *
     * */
    getStatus() {
      fetch('http://localhost:3128/status').then((res) => {
        return res.json();
      }).then((data) => {
          this.logs = data['logs'];
        }).catch((err) => {
          console.error(err);
        })
    },
    /*
     *
     * This method will be called when a user clicks the 'stop' button and will clear the logs
     * But also will be called when this component is created(refreshed) in order to make sure we stop watching
     * and restarting everything.
     *
     * */
    stopMonitoring() {
      if(this.interval) {
        clearInterval(this.interval);
      }
      this.isMonitoring = false;
      this.logs = [];
      fetch('http://localhost:3128/stop',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({folder: this.input.folder})
        }).then((res) => {})
          .catch((err) => {
            console.error(err);
          });
    }
  }
}
