function Scoreboard() {
  const scoreboardData = [
    {
      match: "LQ vs KK",
      venue: "Gaddafi Stadium",
      status: "Live",
      battingTeam: "Lahore Qalandars",
      score: "156/6",
      overs: "20.0",
      batsman: "Rohit",
      runs: 74,
    },
    {
      match: "IU vs PZ",
      venue: "Pindi Stadium",
      status: "Completed",
      battingTeam: "Islamabad United",
      score: "148/7",
      overs: "20.0",
      batsman: "Shadab Khan",
      runs: 55,
    },
    {
      match: "QG vs MS",
      venue: "Multan Cricket Stadium",
      status: "Completed",
      battingTeam: "Multan Sultans",
      score: "145/6",
      overs: "19.2",
      batsman: "Rizwan",
      runs: 68,
    },
  ];

  return (
    <div className="container page">
      <div className="card-surface">
        <h2>Scoreboard</h2>
        <p className="text-muted">Live & completed match scores</p>

        {scoreboardData.map((match, index) => (
          <div
            key={index}
            style={{
              marginTop: "20px",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h4>{match.match}</h4>
              <p className="text-muted">{match.venue}</p>
              <p>
                <strong>{match.battingTeam}</strong> {match.score} ({match.overs})
              </p>
              <p className="text-muted">
                {match.batsman} ({match.runs})
              </p>
            </div>

            <span
              style={{
                background: match.status === "Live" ? "#dc2626" : "#16a34a",
                color: "white",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
              }}
            >
              {match.status}
            </span>
          </div>
        ))}
      </div>

      <footer className="site-footer">
        SportSphere — Scoreboard
      </footer>
    </div>
  );
}

export default Scoreboard;
