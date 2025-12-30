import React from "react";
import styles from "./BoardOptions.module.scss";
import { useSelector, useDispatch } from "react-redux";

import RadioField from "../elements/RadioField";
import SelectField from "../elements/SelectField";
import ColorPicker from "../elements/ColorPicker";
import CollapsibleSection from "../containers/CollapsibleSection";

import icon60 from "../../assets/icons/icon-60.png";

import * as caseActions from "../../store/slices/case";
import * as settingsActions from "../../store/slices/settings";
import * as keyActions from "../../store/slices/keys";

export default function BoardOptions() {
  const dispatch = useDispatch();

  const layout = useSelector(caseActions.selectLayout);
  const legendPrimaryStyle = useSelector(keyActions.selectLegendPrimaryStyle);

  const primaryColor = useSelector(caseActions.selectPrimaryColor);
  const style = useSelector(caseActions.selectStyle);
  const material = useSelector(caseActions.selectMaterial);
  const sceneColor = useSelector(settingsActions.selectSceneColor);

  return (
    <>
      <CollapsibleSection title="General" open={true}>
        <SelectField
          label="Layout"
          selected={layout}
          options={[{ label: "60% JP", value: "60jp", img: icon60 }]}
          handler={(val) => {
            dispatch(caseActions.setLayout(val));
          }}
        />

        <SelectField
          label="Legend Style"
          selected={legendPrimaryStyle}
          options={[
            {
              label: "Cherry(JP)",
              value: "cherry_jp",
              secondaryLabel: "(no subs)",
            },
          ]}
          handler={(val) => {
            dispatch(keyActions.setLegendPrimaryStyle(val));
          }}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Case Options">
        <RadioField
          name="case_style"
          label="Case Style"
          selected={style}
          options={[
            { label: "Rounded", value: "CASE_1" },
            { label: "Angular", value: "CASE_2" },
          ]}
          handler={(val) => {
            dispatch(caseActions.setStyle(val));
          }}
        />

        <RadioField
          name="case_finish"
          label="Case Finish"
          selected={material}
          options={[
            { label: "Matte", value: "matte" },
            { label: "Brushed", value: "brushed" },
            { label: "Glossy", value: "glossy" },
          ]}
          handler={(val) => {
            dispatch(caseActions.setMaterial(val));
          }}
        />

        <div className={styles.row}>
          <div className={styles.fieldColor}>
            <label>Case Color</label>
            <ColorPicker
              color={primaryColor}
              handler={(color) => {
                dispatch(caseActions.setPrimaryColor(color.hex));
                dispatch(caseActions.setAutoColor(false));
              }}
            />
          </div>

          <div className={styles.fieldColor}>
            <label>Scene Color</label>
            <ColorPicker
              color={sceneColor}
              handler={(color) => {
                dispatch(settingsActions.setSceneColor(color.hex));
                dispatch(settingsActions.setSceneAutoColor(false));
              }}
            />
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}
