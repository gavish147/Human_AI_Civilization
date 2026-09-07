"""
Test suite for FastAPI endpoints in HAKCPP server.
"""
from fastapi.testclient import TestClient
from server.app import app

client = TestClient(app)

def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"
    print("Health check passed")

def test_ingest():
    res = client.post(
        "/api/ingest",
        json={
            "source_url": "https://unesco.org/mesopotamia_agri.pdf",
            "source_type": "File",
            "domain": "Agriculture",
            "user_role": "Archivist"
        }
    )
    assert res.status_code == 200
    data = res.json()
    assert "batch_id" in data
    assert data["status"] == "QUEUED"
    print("Ingest test passed:", data["batch_id"])


def test_query():
    res = client.post("/api/query", json={"query": "Agriculture", "user_role": "archivist"})
    assert res.status_code == 200
    data = res.json()
    assert "results" in data
    print("Query test passed:", len(data["results"]), "results found")

def test_audit():
    res = client.get("/api/audit")
    assert res.status_code == 200
    assert "logs" in res.json()
    print("Audit log test passed")

def test_evaluation():
    res = client.get("/api/evaluate")
    assert res.status_code == 200
    assert "metrics" in res.json()
    print("Evaluate test passed")

if __name__ == "__main__":
    test_health()
    test_ingest()
    test_query()
    test_audit()
    test_evaluation()
    print("ALL API TESTS PASSED!")
