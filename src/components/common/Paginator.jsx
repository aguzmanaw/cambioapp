import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  marginTop: 4,
  marginBottom: 4,
  "& .paginator__buttons": {
    padding: 4,
  },
}));

export function Paginator({
  id,
  pages,
  current,
  onChange = { function() {} },
}) {
  return (
    <>
      {pages > 0 && (
        <>
          <StyledBox className={"paginator__container"}>
            <Stack spacing={2} justifyContent="center" alignItems="center">
              <Pagination
                id={id}
                className={"paginator__buttons"}
                count={pages}
                page={current}
                onChange={onChange}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </Stack>
          </StyledBox>
        </>
      )}
    </>
  );
}
