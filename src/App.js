
function App() {

  function scoreCard(input) {

    console.log("you are entered " , input)

    let players = {}; 
    let currentStriker = 'P1';
    let currentNonStriker = 'P2';
    let totalRuns = 0;
    let totalBalls = 0;
    let totalExtras = 0;
    let wickets = 0;
    let remainingWickets = 10;

    for (let i = 0; i < input.length; i++) {
      let ball = input[i];

      //checks Wide or No ball (extras)

      if (ball === 'W' || ball === 'N') {
        totalExtras++;

        // Wicket 

      } else if (ball === 'O') {
        wickets++;
        totalBalls++;
        remainingWickets--;

        // All out

        if (wickets === 10) {
          break;
        }

        // Rotate Batters

        [currentStriker, currentNonStriker] = [currentNonStriker, currentStriker];

        // Dot ball, no runs scored

      } else if (ball === '.') {
        totalBalls++;

        // runs

      } else {
        let runs = parseInt(ball, 10);
        totalRuns += runs;
        totalBalls++;

        // Add runs to the current striker

        if (!players[currentStriker]) {
          players[currentStriker] = 0;
        }
        players[currentStriker] += runs;

        // Rotate Striker in every Overs

        if (totalBalls % 6 === 0) {
          [currentStriker, currentNonStriker] = [currentNonStriker, currentStriker];
        }
      }
    }

    // Total results as expected 

    const output = Object.keys(players).map((player) => {
      return `${player} - ${players[player]}(runs)`;
    });

    output.push(`Strike - ${currentStriker}`);
    output.push(`Non-Strike - ${currentNonStriker}`);
    output.push(`Total - ${totalRuns}`);
    output.push(`Overs - ${Math.floor(totalBalls / 6)}.${totalBalls % 6}`);
    output.push(`Extra - ${totalExtras}`);
    output.push(`Wicket(s) - ${wickets}`);
    output.push(`Remaining Wicket(s) - ${remainingWickets}`);

    return output.join('\n');
  }

  // Test Here

  console.log(scoreCard('...222431666'));
  console.log(scoreCard('46112W1O166O.21143O'));
  console.log(scoreCard('111111222...'));


  return (
    <div style={{ textAlign: 'center', marginTop: "50px" }}>
      <h3>Javascript Task</h3>
      <p>Please update the inputs and check the outputs in console</p>
    </div>
  );
}

export default App;
