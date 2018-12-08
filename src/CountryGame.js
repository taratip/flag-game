import React, {Component} from 'react';
import FlagQuestion, {QuestionStates} from './FlagQuestion';
import shuffle from 'shuffle-array';
import './CountryGame.css';

class CountryGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries : [],
      options: [],
      correctOption: undefined,
      questionState: undefined
    }

    this.nextQuestion = this.nextQuestion.bind(this);
    this.onGuess = this.onGuess.bind(this);
  }

  nextQuestion() {
    const {countries} = this.state;
    const correctOption = Math.floor(Math.random() * countries.length);
    const options = this._getOptions(correctOption, countries);
    this.setState({
      options,
      correctOption,
      questionState: QuestionStates.QUESTION
    });
  }

  onGuess(answer) {
    const {correctOption} = this.state;
    let questionState = answer === correctOption ?
      QuestionStates.ANSWER_CORRECT : QuestionStates.ANSWER_WRONG;
    this.setState({questionState});
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
    .then(data => data.json())
    .then(countries => {
      // get one correct option
      const correctOption = Math.floor(Math.random() * countries.length);
      const options = this._getOptions(correctOption, countries);

      this.setState({
        countries,
        options,
        correctOption,
        questionState: QuestionStates.QUESTION
      });
    })
    .catch(console.warn);
  }

  _getOptions(correctOption, countries) {
    let options = [correctOption]; // first one is correct option
    let tries = 0;
    // generate 4 options including correct one
    while (options.length < 4 && tries < 15) {
      let option = Math.floor(Math.random() * countries.length); // random options
      if (options.indexOf(options) === -1) {
        options.push(option);
      } else {
        tries++;
      }
    }
    return shuffle(options);
  }

  render() {
    let {
      countries,
      correctOption,
      options,
      questionState
    } = this.state;

    let output = <div>Loading...</div>;
    if (correctOption !== undefined) {
      const {flag, name} = countries[correctOption];
      let opts = options.map(opt => {
        return {
          id: opt,
          name: countries[opt].name
        };
      });

      output = (
        <FlagQuestion
          answerText={name}
          flag={flag}
          options={opts}
          questionState={questionState}
          onGuess={this.onGuess}
          onNext={this.nextQuestion}
        />
      );
    }
    return (
      <div>
        {output}
      </div>
    );
  }
}

export default CountryGame;
