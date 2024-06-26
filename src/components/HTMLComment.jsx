import React from 'react';
import { useLayoutEffect } from '../utils/useIsomorphicLayoutEffect'
import PropTypes from 'prop-types';

/**
 * @param {{text: string}} props
 */
const HTMLComment = (props) => {
  const { text } = props;
  const ref = React.createRef();

  useLayoutEffect(() => {
    let el = null
    let parent = null
    let comm = null

    if (ref.current) {
      el = ref.current;
      parent = el.parentNode;
      comm = (window || global).document.createComment(` ${text.trim()} `);
      try {
        if (parent && parent.contains(el)) {
          parent.replaceChild(comm, el);
        }
      } catch (err) {
        console.error(err);
      }
    }

    return () => {
      if(parent && el && comm) {
        parent.replaceChild(el, comm)
      }
    }
  }, []);

  return <div ref={ref} style={{ display: 'none' }} />;
};

HTMLComment.propTypes = {
  text: PropTypes.string,
};

export default HTMLComment;
