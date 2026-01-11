const fixtures = [
  {
    team1: "Lahore Qalandars",
    team2: "Karachi Kings",
    date: "15 Feb 2026",
    status: "Upcoming",
  },
  {
    team1: "Islamabad United",
    team2: "Peshawar Zalmi",
    date: "18 Feb 2026",
    status: "Completed",
  },
  {
    team1: "Multan Sultans",
    team2: "Quetta Gladiators",
    date: "20 Feb 2026",
    status: "Upcoming",
  },
];

function Fixtures() {
  return (
    <div className="container page">
      <div className="card-surface">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="card-heading">Match Fixtures</h4>
            <div className="muted small-note">
              Upcoming & completed fixtures
            </div>
          </div>

          <button
            className="btn btn-primary-custom"
            onClick={() =>
              alert("Fixture creation modal would open in full app")
            }
          >
            + Add Fixture
          </button>
        </div>

        <div style={{ marginTop: "12px" }}>
          {fixtures.map((match, index) => (
            <div
              key={index}
              style={{
                padding: "15px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{match.team1}</strong> vs{" "}
                <strong>{match.team2}</strong>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {match.date}
                </div>
              </div>

              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  background:
                    match.status === "Upcoming" ? "#0d6efd" : "#198754",
                  color: "white",
                }}
              >
                {match.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <footer className="site-footer">SportSphere — Fixtures</footer>
    </div>
  );
}

export default Fixtures;
