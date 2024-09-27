import Box from "@mui/material/Box";
import { FormProvider, FTextField } from "./form";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { alpha, Autocomplete, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { addPokemon } from "../features/pokemons/pokemonSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { pokemonTypes } from "../pokemonTypes";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PokemonModal({ open, setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nameValue, setNameValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [type1Value, setType1Value] = useState("");
  const [type2Value, setType2Value] = useState("");

  const types = [type1Value, type2Value].filter((type) => type);

  const defaultValues = {
    name: nameValue,
    id: Number(idValue),
    imgUrl: urlValue,
    types: types,
  };

  const methods = useForm(defaultValues);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = () => {
    dispatch(addPokemon(defaultValues))
      .then(() => setOpen(false))
      .then(() => {
        navigate(`/pokemons/${idValue}`);
      });

    setNameValue("");
    setIdValue("");
    setUrlValue("");
    setType1Value("");
    setType2Value("");
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                name="name"
                fullWidth
                rows={4}
                placeholder="Name"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <FTextField
                value={idValue}
                onChange={(e) => setIdValue(e.target.value)}
                name="id"
                fullWidth
                rows={4}
                placeholder="Id"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <FTextField
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                name="url"
                fullWidth
                placeholder="Image Url"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <Autocomplete
                options={pokemonTypes}
                value={type1Value}
                onChange={(e, newValue) => setType1Value(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type 1"
                    placeholder="Choose a type"
                    fullWidth
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                )}
              />
              <Autocomplete
                options={pokemonTypes}
                value={type2Value}
                onChange={(e, newValue) => setType2Value(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type 2"
                    placeholder="Choose a type"
                    fullWidth
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                )}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={isSubmitting}
                >
                  Create Pokemon
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
