import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EmployeeManagementWebPartStrings';
import EmployeeManagement from './components/EmployeeManagement';
import { IEmployeeManagementProps } from './components/IEmployeeManagementProps';
export interface IEmployeeManagementWebPartProps {
  description: string;
}

export default class EmployeeManagementWebPart extends BaseClientSideWebPart<IEmployeeManagementWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IEmployeeManagementProps> =
      React.createElement(EmployeeManagement, {
        description: this.properties.description,
        context: this.context,
        webUrl: this.context.pageContext.web.absoluteUrl,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
