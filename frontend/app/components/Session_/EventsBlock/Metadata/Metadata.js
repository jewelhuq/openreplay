import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { NoContent, IconButton, Popup } from 'UI';
import withToggle from 'HOCs/withToggle';
import MetadataItem from './MetadataItem';
import stl from './metadata.css';
import cn from 'classnames';

export default connect(state => ({
  metadata: state.getIn([ 'sessions', 'current', 'metadata' ]),
}))(function Metadata ({ metadata }) {
  const [ visible, setVisible ] = useState(false);
  const toggle = useCallback(() => metadata.length > 0 && setVisible(v => !v), []);
  return (
    <>
      <Popup
        trigger={
          <IconButton
            className={cn("w-full", { 'opacity-25' : metadata.length === 0 })}
            onClick={ toggle }
            icon="id-card"
            plain
            label="Metadata"
            primaryText
            active={ visible }
            id="metadata-button"
            // disabled={ metadata.length === 0 }
          />
        }
        content={
          <div className="p-2">
            Check <a href="https://docs.openreplay.com/installation/metadata" target="_blank" className="link">how to use Metadata</a> if you haven’t yet done so.
          </div>
        }
        on="click"
        disabled={metadata.length > 0}
        size="tiny"
        inverted
        position="top center"
      />
      { visible && 
        <div className={ stl.modal } >
          <NoContent show={ metadata.size === 0 } size="small">
            { metadata.map((i) => {
              const key = Object.keys(i)[0]
              const value = i[key]
              return <MetadataItem item={ { value, key } } key={ key } />
            }) }
          </NoContent>
        </div>
      }
    </>
  );
});
