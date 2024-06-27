import React, {FC} from 'react';

interface FileNameFormatterProps {
    filename: string;
    extension: string
}

const FileNameFormatter: FC<FileNameFormatterProps> = ({ filename, extension }) => {
    const slicedFilename = filename.split('_').slice(1).join('_');
    const formattedFilename = `${slicedFilename}.${extension}`

    return (<>
      {formattedFilename}
    </>);
};

export default FileNameFormatter;