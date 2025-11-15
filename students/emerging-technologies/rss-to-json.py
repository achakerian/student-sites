#!/usr/bin/env python3
"""
RSS Feed to JSON Converter for Emerging Technologies Website

This script fetches technology data from RSS feeds and converts it to
the technologies.json format used by the website.

Usage:
    python rss-to-json.py

Requirements:
    pip install feedparser requests
"""

import json
import feedparser
import requests
from datetime import datetime
from typing import List, Dict

# RSS Feed sources (add your RSS feed URLs here)
RSS_FEEDS = [
    "https://example.com/tech-news.rss",
    # Add more RSS feed URLs
]

# Technology keywords to filter relevant items
TECH_KEYWORDS = [
    "artificial intelligence", "ai", "machine learning",
    "quantum computing", "quantum",
    "blockchain", "cryptocurrency", "web3",
    "augmented reality", "virtual reality", "ar", "vr",
    "internet of things", "iot",
    "biotechnology", "biotech", "crispr", "gene editing"
]

def extract_year_from_date(date_string):
    """Extract year from RSS feed date string"""
    try:
        parsed_date = feedparser._parse_date(date_string)
        return parsed_date[0] if parsed_date else datetime.now().year
    except:
        return datetime.now().year

def categorize_technology(title, description):
    """Categorize technology based on keywords"""
    text = (title + " " + description).lower()

    if any(word in text for word in ["ai", "artificial intelligence", "machine learning"]):
        return {
            "id": "ai",
            "name": "Artificial Intelligence",
            "icon": "🤖",
            "category": "ai"
        }
    elif any(word in text for word in ["quantum"]):
        return {
            "id": "quantum",
            "name": "Quantum Computing",
            "icon": "⚛️",
            "category": "quantum"
        }
    elif any(word in text for word in ["blockchain", "crypto", "web3"]):
        return {
            "id": "blockchain",
            "name": "Blockchain",
            "icon": "🔗",
            "category": "blockchain"
        }
    elif any(word in text for word in ["ar", "vr", "augmented reality", "virtual reality"]):
        return {
            "id": "ar-vr",
            "name": "AR/VR",
            "icon": "🥽",
            "category": "ar-vr"
        }
    elif any(word in text for word in ["iot", "internet of things"]):
        return {
            "id": "iot",
            "name": "Internet of Things",
            "icon": "📡",
            "category": "iot"
        }
    elif any(word in text for word in ["biotech", "crispr", "gene"]):
        return {
            "id": "biotech",
            "name": "Biotechnology",
            "icon": "🧬",
            "category": "biotech"
        }

    return None

def get_image_for_tech(tech_id):
    """Get appropriate Unsplash image for technology"""
    images = {
        "ai": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        "quantum": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        "blockchain": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        "ar-vr": "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800",
        "iot": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800",
        "biotech": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800"
    }
    return images.get(tech_id, "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800")

def parse_rss_feeds(feeds: List[str]) -> List[Dict]:
    """Parse RSS feeds and extract technology information"""
    technologies = []

    for feed_url in feeds:
        try:
            print(f"Parsing feed: {feed_url}")
            feed = feedparser.parse(feed_url)

            for entry in feed.entries:
                title = entry.get('title', '')
                description = entry.get('summary', entry.get('description', ''))
                link = entry.get('link', '')
                published = entry.get('published', entry.get('updated', ''))

                # Categorize the technology
                tech_category = categorize_technology(title, description)

                if tech_category:
                    year = extract_year_from_date(published)

                    tech_data = {
                        "id": tech_category["id"],
                        "name": tech_category["name"],
                        "fullName": tech_category["name"],
                        "icon": tech_category["icon"],
                        "year": year,
                        "yearLabel": f"Since {year}",
                        "description": description[:200] + "..." if len(description) > 200 else description,
                        "image": get_image_for_tech(tech_category["id"]),
                        "detailPage": f"technologies/{tech_category['id']}.html",
                        "source": link
                    }

                    technologies.append(tech_data)

        except Exception as e:
            print(f"Error parsing feed {feed_url}: {e}")

    return technologies

def merge_with_existing(new_techs: List[Dict], existing_file: str = "technologies.json") -> Dict:
    """Merge new technologies with existing data"""
    try:
        with open(existing_file, 'r') as f:
            existing_data = json.load(f)
            existing_techs = existing_data.get('technologies', [])
    except FileNotFoundError:
        existing_techs = []

    # Create a dictionary of existing technologies by ID
    tech_dict = {tech['id']: tech for tech in existing_techs}

    # Update or add new technologies
    for tech in new_techs:
        tech_id = tech['id']
        if tech_id in tech_dict:
            # Update existing technology (keep original year if it's older)
            if tech['year'] > tech_dict[tech_id]['year']:
                tech['year'] = tech_dict[tech_id]['year']
                tech['yearLabel'] = tech_dict[tech_id]['yearLabel']
        tech_dict[tech_id] = tech

    # Convert back to list and sort by year
    merged_techs = sorted(tech_dict.values(), key=lambda x: x['year'])

    return {"technologies": merged_techs}

def save_to_json(data: Dict, output_file: str = "technologies.json"):
    """Save technologies data to JSON file"""
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Saved {len(data['technologies'])} technologies to {output_file}")

def main():
    """Main function to process RSS feeds and update technologies.json"""
    print("Starting RSS to JSON conversion...")

    # Parse RSS feeds
    new_technologies = parse_rss_feeds(RSS_FEEDS)
    print(f"Found {len(new_technologies)} technologies from RSS feeds")

    # Merge with existing data
    merged_data = merge_with_existing(new_technologies)

    # Save to JSON file
    save_to_json(merged_data)

    print("Done!")

if __name__ == "__main__":
    main()
