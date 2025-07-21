
import { type ContentPiece } from "../data/terms";

const ContentRenderer: React.FC<{ content: ContentPiece[] }> = ({ content }) => {
    return (
      <>
        {content.map((piece, index) => {
          if (typeof piece === 'string') {
            return <span key={index}>{piece}</span>;
          }
          // It's a link object
          const Element = piece.bold ? 'strong' : 'span';
          return (
            <a key={index} href={piece.href} className="text-blue-600 hover:underline font-medium">
              <Element>{piece.text}</Element>
            </a>
          );
        })}
      </>
    );
  };

export default ContentRenderer;