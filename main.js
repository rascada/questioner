Vue.filter('questionNumber', function(value) {
  return value != null ? '#' + (Number(value) + 1)  : '';
});

var vm = new Vue({
  el: 'body',
  data: {
    addQuestionContainer: false,
    newQuestion: '',
    questions: [],
    randomQuestion: null,
  },
  ready: function() {
    var jsonQuestions = JSON.parse(localStorage.getItem('questions'));

    this.questions = jsonQuestions || [];
  },

  methods: {
    addQuestion: function() {
      if (this.newQuestion) {
        this.questions.push(this.newQuestion);
        this.newQuestion = '';
      }
    },

    drawLots: function() {
      this.randomQuestion = Math.random() * this.questions.length | 0;
    },

    remove: function($index) {
      this.questions.splice($index, 1);
    },
  },
  computed: {
    questionsJson: function() {
      var json = JSON.stringify(this.questions);

      if (this.questions.length)
      localStorage.setItem('questions', json);

      return json;
    }, // router - wrt64gs v5 - v6 1.50.6
  },
});
