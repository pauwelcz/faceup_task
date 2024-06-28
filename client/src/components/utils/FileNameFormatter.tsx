import React, {FC} from 'react';

interface FileNameFormatterProps {
    filename: string;
}

const FileNameFormatter: FC<FileNameFormatterProps> = ({ filename }) => {
    const slicedFilename = filename.split('_').slice(1).join('_');
    const formattedFilename = `${slicedFilename}`

    return (<>
      {formattedFilename}
    </>);
};

export default FileNameFormatter;