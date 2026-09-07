"""
Audit Logger — In-memory tamper-evident audit trail.
"""
import time
import hashlib
import json
from typing import Optional


class AuditLogger:
    def __init__(self):
        self._logs = []
        self._counter = 8800

    def log(
        self,
        user: str,
        role: str,
        action: str,
        resource: str,
        outcome: str,
        risk: str = "LOW",
    ) -> dict:
        self._counter += 1
        entry = {
            "id": f"AUD-{self._counter}",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "user": user,
            "role": role,
            "action": action,
            "resource": resource,
            "outcome": outcome,
            "risk": risk,
        }
        # Compute tamper-evident hash
        entry["integrity_hash"] = hashlib.sha256(
            json.dumps(entry, sort_keys=True).encode()
        ).hexdigest()[:16]

        self._logs.insert(0, entry)
        return entry

    def get_logs(self, limit: int = 50, risk_filter: Optional[str] = None) -> list:
        logs = self._logs
        if risk_filter:
            logs = [l for l in logs if l["risk"] == risk_filter.upper()]
        return logs[:limit]
