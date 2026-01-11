import { useState } from "react";

const teams = [
  { name: "Lahore Qalandars", played: 8, won: 6, lost: 2, points: 12, nrr: "+0.82" },
  { name: "Islamabad United", played: 8, won: 5, lost: 3, points: 10, nrr: "+0.12" },
  { name: "Multan Sultans", played: 8, won: 5, lost: 3, points: 10, nrr: "+0.40" },
  { name: "Karachi Kings", played: 8, won: 4, lost: 4, points: 8, nrr: "-0.10" },
  { name: "Peshawar Zalmi", played: 8, won: 3, lost: 5, points: 6, nrr: "-0.60" },
  { name: "Quetta Gladiators", played: 8, won: 2, lost: 6, points: 4, nrr: "-1.20" },
];

function Leaderboard() {
  const [sortBy, setSortBy] = useState("points");

  const sortedTeams = [...teams].sort((a, b) => {
    if (sortBy === "points") return b.points - a.points;
    if (sortBy === "won") return b.won - a.won;
    if (sortBy === "nrr") return parseFloat(b.nrr) - parseFloat(a.nrr);
    return 0;
  });

  return (
    <div className="container page">
      <div className="card-surface">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2>Leaderboard</h2>
            <p className="text-muted">Sort teams by points, wins, or NRR</p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="points">Sort: Points</option>
            <option value="won">Sort: Wins</option>
            <option value="nrr">Sort: NRR</option>
          </select>
        </div>

        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f1f7fb" }}>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "left" }}>Team</th>
              <th>Played</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Points</th>
              <th>NRR</th>
            </tr>
          </thead>

          <tbody>
            {sortedTeams.map((team, index) => (
              <tr key={team.name} style={{ borderBottom: "1px solid #eee" }}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left" }}>{team.name}</td>
                <td>{team.played}</td>
                <td>{team.won}</td>
                <td>{team.lost}</td>
                <td><strong>{team.points}</strong></td>
                <td>{team.nrr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="site-footer">SportSphere — Leaderboard</footer>
    </div>
  );
}

export default Leaderboard;
