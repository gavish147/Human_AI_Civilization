"""
Preservation Validator — Validates incoming data sources and assigns risk levels.
"""
import re


BLOCKED_DOMAINS = ["spam.com", "malicious.io", "untrusted.net"]

RISK_RULES = {
    "CRITICAL": ["delete", "purge", "wipe", "admin/delete"],
    "HIGH":     ["modify", "override", "replace"],
    "MEDIUM":   ["update", "patch", "merge"],
    "LOW":      [],
}


class PreservationValidator:

    def validate_source(self, source_url: str, domain: str) -> dict:
        """Validate a data source URL and assign a risk level."""
        issues = []
        risk_level = "LOW"
        confidence = 95

        # Check blocked domains
        for blocked in BLOCKED_DOMAINS:
            if blocked in source_url.lower():
                issues.append(f"Blocked domain detected: {blocked}")
                risk_level = "CRITICAL"
                confidence = 0

        # Check URL format
        url_pattern = re.compile(r"https?://\S+|/[a-zA-Z0-9/_.-]+")
        if not url_pattern.match(source_url):
            issues.append("Source URL format is invalid or unresolvable.")
            risk_level = "HIGH"
            confidence -= 30

        # Domain validation
        valid_domains = [
            "Agriculture", "Medicine", "Astronomy", "Science & Technology",
            "Philosophy & Religion", "Culture & Arts", "Governance & Law", "Uncategorized"
        ]
        if domain not in valid_domains:
            issues.append(f"Unknown domain '{domain}'. Defaulting to Uncategorized.")
            domain = "Uncategorized"
            confidence -= 10

        return {
            "valid": len([i for i in issues if "Blocked" not in i]) == 0 or risk_level != "CRITICAL",
            "risk_level": risk_level,
            "confidence_pct": max(confidence, 0),
            "issues": issues,
            "domain_resolved": domain,
        }

    def detect_duplicates(self, entry_hash: str, existing_hashes: list) -> bool:
        """Simple hash-based duplicate detection."""
        return entry_hash in existing_hashes
