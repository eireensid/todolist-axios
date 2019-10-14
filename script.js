var app = new Vue({
  el: '#app',
  data: {
    title: 'Task list',
    items: [],
    baseUrl: 'http://192.168.1.97:9000'
  },
  created () {
    axios.get(this.baseUrl + '/tasks')
      .then((response) => {
        console.log(response.data)
        this.items = response.data
      })
      .catch((error) => {
        console.log(error);
      })
  },
  methods: {
    addItem: function () {
      var input = document.getElementById('itemForm');

      if (input.value !== '') {
        axios.post(this.baseUrl + '/task', {
          name: input.value
        })
          .then((response) => {
            console.log(response)
            this.items.push(response.data)
            input.value = ''
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    deleteItem: function(index) {
      const deleteTask = this.items[index]
      console.log('deleteTask', deleteTask)
      axios.post(this.baseUrl + '/delete/task', deleteTask)
        .then((response) => {
          console.log(response)
          this.items.splice(index, 1)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
});