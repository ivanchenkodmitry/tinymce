import Delay from 'tinymce/core/api/util/Delay';

declare let tinymce: any;

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'picture code paste',
  toolbar: 'undo redo | picture code',
  paste_data_images: true,
  paste_as_picture: true,
  image_caption: true,
  image_advtab: true,
  image_title: true,
  image_list: [
    { text: 'Google', value: 'https://www.google.com/google.jpg' }
  ],
  image_class_list: [
    { title: 'None', value: '' },
    { title: 'Class1', value: 'class1' },
    { title: 'Class2', value: 'class2' }
  ],
  // images_upload_url: 'postAcceptor.php',
  file_picker_callback(callback, value, meta) {
    callback('https://www.google.com/logos/google.jpg', {
      alt: 'My alt text',
      sourceList: [
        {
          type: 'image/webp',
          media: '(min-width: 768px)',
          srcset: 'https://www.gstatic.com/webp/gallery/4.sm.webp',
        },
        {
          type: 'image/jpg',
          media: '(min-width: 768px)',
          srcset: 'https://www.gstatic.com/webp/gallery/2.sm.jpg',
        },
        {
          type: 'image/webp',
          media: '',
          srcset: 'https://www.gstatic.com/webp/gallery/5.sm.webp',
        },
      ]
    });
  },
  images_upload_handler: (blobInfo, success, failure, progress) => {
    Delay.setTimeout(function () {
      success('https://www.google.com/logos/google.jpg', {
        alt: 'My alt text',
        sourceList: [
          {
            type: 'image/webp',
            media: '(min-width: 768px)',
            srcset: 'https://www.gstatic.com/webp/gallery/4.sm.webp',
          },
          {
            type: 'image/jpg',
            media: '(min-width: 768px)',
            srcset: 'https://www.gstatic.com/webp/gallery/2.sm.jpg',
          },
          {
            type: 'image/webp',
            media: '',
            srcset: 'https://www.gstatic.com/webp/gallery/5.sm.webp',
          },
        ]
      });

    }, 500);
  },
  height: 600
});

export { };
