"""Regression coverage for dynamic travel blog photo manifest validation."""
import copy
import unittest
from optimize_travel_blog_hub_images import validate_manifest


def manifest_for(size):
    return {
        "directorySize": size,
        "topicCounts": {"all": size, "tips": size - 1, "empty": 0},
        "sources": [
            {"src": f"/images/guide-{i}.webp", "guideIds": [f"guide-{i}"],
             "views": ["all"] + (["tips"] if i else [])}
            for i in range(size)
        ],
    }


class ManifestValidationTests(unittest.TestCase):
    def test_changing_directory_sizes(self):
        for size in (1, 7, 35, 42, 49, 60):
            with self.subTest(size=size):
                self.assertEqual(len(validate_manifest(manifest_for(size))), size)

    def test_rejects_incomplete_or_inconsistent_manifest(self):
        original = manifest_for(3)
        for name, mutate in (
            ("missing_photo", lambda m: m["sources"].pop()),
            ("duplicate_photo", lambda m: m["sources"][1].update(src=m["sources"][0]["src"])),
            ("duplicate_guide", lambda m: m["sources"][1].update(guideIds=m["sources"][0]["guideIds"])),
            ("wrong_all_count", lambda m: m["topicCounts"].update(all=4)),
            ("wrong_topic_count", lambda m: m["topicCounts"].update(tips=1)),
            ("unknown_topic", lambda m: m["sources"][0]["views"].append("unknown")),
            ("duplicate_topic", lambda m: m["sources"][0]["views"].append("all")),
            ("missing_all", lambda m: m["sources"][0]["views"].remove("all")),
        ):
            with self.subTest(name=name):
                candidate = copy.deepcopy(original)
                mutate(candidate)
                with self.assertRaises(ValueError):
                    validate_manifest(candidate)


if __name__ == "__main__":
    unittest.main()
