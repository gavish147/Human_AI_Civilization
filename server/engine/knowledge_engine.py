"""
Knowledge Engine — AI-assisted search and record estimation.
"""
import random
import re


KNOWLEDGE_DB = [
    {"id": "KE-001", "title": "Mesopotamian Irrigation Systems", "domain": "Agriculture",
     "era": "3000 BCE–500 BCE", "region": "Middle East", "confidence": 96,
     "summary": "Ancient Sumerian canal networks and flood management systems."},
    {"id": "KE-002", "title": "Byzantine Medical Codex", "domain": "Medicine",
     "era": "500 CE–1453 CE", "region": "Eastern Mediterranean", "confidence": 88,
     "summary": "Byzantine herbal remedies, surgical procedures, and epidemic protocols."},
    {"id": "KE-003", "title": "Mayan Astronomical Calendar", "domain": "Astronomy",
     "era": "250 CE–900 CE", "region": "Mesoamerica", "confidence": 94,
     "summary": "Long Count Calendar system with Venus cycle tracking and eclipse prediction."},
    {"id": "KE-004", "title": "Renaissance Engineering Manuscripts", "domain": "Science & Technology",
     "era": "1400 CE–1600 CE", "region": "Europe", "confidence": 91,
     "summary": "Leonardo da Vinci and contemporaries' engineering schematics."},
    {"id": "KE-005", "title": "Vedic Mathematical Sutras", "domain": "Philosophy & Religion",
     "era": "1500 BCE–500 BCE", "region": "South Asia", "confidence": 82,
     "summary": "Ancient Vedic mathematical algorithms encoded in Sanskrit."},
]


class KnowledgeEngine:

    def search(self, query: str, domain: str = None) -> list:
        """Perform keyword search with optional domain filter."""
        query_lower = query.lower()
        results = []
        for entry in KNOWLEDGE_DB:
            score = 0
            if query_lower in entry["title"].lower():
                score += 3
            if query_lower in entry["summary"].lower():
                score += 2
            if query_lower in entry["domain"].lower():
                score += 1
            if domain and entry["domain"] == domain:
                score += 2
            if score > 0:
                results.append({**entry, "relevance_score": min(score * 15 + 40, 98)})
        results.sort(key=lambda x: x["relevance_score"], reverse=True)
        return results[:10]

    def estimate_record_count(self, source_type: str) -> int:
        """Estimate expected records based on source type."""
        estimates = {
            "API": random.randint(5000, 15000),
            "File": random.randint(500, 5000),
            "Web": random.randint(2000, 10000),
            "Database": random.randint(10000, 50000),
            "Manual": random.randint(10, 200),
        }
        return estimates.get(source_type, random.randint(1000, 5000))
