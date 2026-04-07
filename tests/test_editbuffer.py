import unittest

from helix.blobs import fourcc_int
from helix.editbuffer import (
    extract_active_model_id,
    find_io_block,
    find_signal_block,
    normalize_edit_buffer,
    parse_row,
    row_block_position,
)


class TestEditBuffer(unittest.TestCase):
    def test_normalize_edit_buffer_coerces_numeric_keys(self):
        raw = {str(fourcc_int("sfg_")): {str(fourcc_int("flow")): []}}
        normalized = normalize_edit_buffer(raw)
        self.assertEqual(normalized, {"sfg_": {"flow": []}})

    def test_parse_row_accepts_labels_and_indexes(self):
        self.assertEqual(parse_row("1A"), 0)
        self.assertEqual(parse_row("b2"), 3)
        self.assertEqual(parse_row("2"), 2)

    def test_parse_row_rejects_invalid_value(self):
        with self.assertRaises(ValueError):
            parse_row("3A")

    def test_row_block_position_rejects_out_of_range(self):
        with self.assertRaises(ValueError):
            row_block_position(0, 0)

    def test_find_signal_block_uses_bmap_and_block_object(self):
        state = {
            "sfg_": {
                "flow": [
                    {
                        "bmap": list(range(28)),
                        "blks": [1, {"id__": 11, "mdls": [{"id__": 501}]}],
                    }
                ]
            }
        }
        block_id, block = find_signal_block(state, 0, 1)
        self.assertEqual(block_id, 1)
        self.assertEqual(block["id__"], 11)

    def test_find_signal_block_returns_none_for_missing_flow(self):
        block_id, block = find_signal_block(None, 0, 1)
        self.assertIsNone(block_id)
        self.assertIsNone(block)

    def test_find_io_block_reads_output_slot(self):
        state = {
            "sfg_": {
                "flow": [
                    {
                        "bmap": list(range(28)),
                        "blks": [13, {"id__": 99, "mdls": [{"id__": 700}]}],
                    }
                ]
            }
        }
        block_id, block = find_io_block(state, 0, "output")
        self.assertEqual(block_id, 13)
        self.assertEqual(block["id__"], 99)

    def test_extract_active_model_id_reads_first_model(self):
        model_id = extract_active_model_id({"mdls": [{"id__": 404}, {"id__": 405}]})
        self.assertEqual(model_id, 404)

    def test_extract_active_model_id_handles_missing_models(self):
        self.assertIsNone(extract_active_model_id({"mdls": []}))


if __name__ == "__main__":
    unittest.main()
