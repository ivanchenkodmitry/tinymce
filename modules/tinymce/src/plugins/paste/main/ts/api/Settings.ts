/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import Editor from 'tinymce/core/api/Editor';

const shouldBlockDrop = (editor: Editor): boolean => {
  return editor.getParam('paste_block_drop', false);
};

const shouldPasteDataImages = (editor: Editor): boolean => {
  return editor.getParam('paste_data_images', false);
};

const shouldPasteAsPicture = (editor: Editor): boolean => {
  return editor.getParam('paste_as_picture', false);
};

const shouldFilterDrop = (editor: Editor): boolean => {
  return editor.getParam('paste_filter_drop', true);
};

type ProcessFn = (plugin, args) => void;

const getPreProcess = (editor: Editor): ProcessFn => {
  return editor.getParam('paste_preprocess');
};

const getPostProcess = (editor: Editor): ProcessFn => {
  return editor.getParam('paste_postprocess');
};

const getWebkitStyles = (editor: Editor): string => {
  return editor.getParam('paste_webkit_styles');
};

const shouldRemoveWebKitStyles = (editor: Editor): boolean => {
  return editor.getParam('paste_remove_styles_if_webkit', true);
};

const shouldMergeFormats = (editor: Editor): boolean => {
  return editor.getParam('paste_merge_formats', true);
};

const isSmartPasteEnabled = (editor: Editor): boolean => {
  return editor.getParam('smart_paste', true);
};

const isPasteAsTextEnabled = (editor: Editor): boolean => {
  return editor.getParam('paste_as_text', false);
};

const getRetainStyleProps = (editor: Editor): string => {
  return editor.getParam('paste_retain_style_properties');
};

const getWordValidElements = (editor: Editor): string => {
  const defaultValidElements = (
    '-strong/b,-em/i,-u,-span,-p,-ol,-ul,-li,-h1,-h2,-h3,-h4,-h5,-h6,' +
    '-p/div,-a[href|name],sub,sup,strike,br,del,table[width],tr,' +
    'td[colspan|rowspan|width],th[colspan|rowspan|width],thead,tfoot,tbody'
  );

  return editor.getParam('paste_word_valid_elements', defaultValidElements);
};

const shouldConvertWordFakeLists = (editor: Editor): boolean => {
  return editor.getParam('paste_convert_word_fake_lists', true);
};

const shouldUseDefaultFilters = (editor: Editor): boolean => {
  return editor.getParam('paste_enable_default_filters', true);
};

export default {
  shouldBlockDrop,
  shouldPasteDataImages,
  shouldPasteAsPicture,
  shouldFilterDrop,
  getPreProcess,
  getPostProcess,
  getWebkitStyles,
  shouldRemoveWebKitStyles,
  shouldMergeFormats,
  isSmartPasteEnabled,
  isPasteAsTextEnabled,
  getRetainStyleProps,
  getWordValidElements,
  shouldConvertWordFakeLists,
  shouldUseDefaultFilters
};
