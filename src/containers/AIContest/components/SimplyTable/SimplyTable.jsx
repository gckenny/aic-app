import {
  Checkbox,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from '@tonic-ui/react';
import { each, forEach } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import ListItem from '../../../../components/ListItem';
import UnorderedList from '../../../../components/UnorderedList';

import './index.css';

function SimplyTable({ data }) {
  const TABLE_HEADER_HEIGHT = 40;
  const TABLE_ROW_HEIGHT = 40;
  return (
    <Table
      height={TABLE_ROW_HEIGHT * data.body.length + TABLE_HEADER_HEIGHT}
      width="100%"
      className={`a1c1-simply-table cols_${data.header.length}`}
    >
      <TableHeader className="header">
        <TableHeaderRow>
          {data.header.map((item, index) => (
            <TableHeaderCell className={`col${index}`} key={index}>
              {item}
            </TableHeaderCell>
          ))}
        </TableHeaderRow>
      </TableHeader>
      <TableBody className="body">
        {data.body.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {item.map((value, colIndex) => (
              <TableCell className={`col${colIndex}`} key={colIndex}>
                {colIndex === 0 && value}
                {colIndex === 1 &&
                  (typeof value === 'string' ? (
                    value
                  ) : (
                    <UnorderedList pl={16} pt={0} mt={0}>
                      {value.map((item, index) => (
                        <ListItem key={index}>{item}</ListItem>
                      ))}
                    </UnorderedList>
                  ))}
                {colIndex === 2 &&
                  (typeof value === 'string' ? (
                    value
                  ) : (
                    <UnorderedList pl={16} pt={0} mt={0} listStyleType="none">
                      {value.map((item, index) => (
                        <ListItem key={index}>
                          {/* {item} */}
                          {Array.from({ length: item }, (_, i) => (
                            <Icon icon="star" key={i} />
                          ))}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  ))}
                {colIndex === 3 && <Checkbox pt={8} />}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SimplyTable;

SimplyTable.propTypes = {
  data: PropTypes.object,
};

SimplyTable.defaultProps = {
  data: {
    header: ['Header 1', 'Header 2', 'Header 3'],
    body: [
      ['Content column 1', 'Content column 2', 'Content column 3'],
      ['Content column 1', 'Content column 2', 'Content column 3'],
    ],
  },
};
